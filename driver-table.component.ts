import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CropperSettings } from 'ngx-img-cropper';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { CommonService } from 'src/app/shared/services/common.service';
import * as _ from "lodash";
import { MotoristaService } from 'src/app/shared/services/motorista.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-edit.html'
})
export class NgbdModalContent implements OnInit{
  @Input() dataForm;
  modalOption: NgbModalOptions = {};
  motoristaForm: FormGroup;
  loading: boolean = true;

  avatar: any;
  cropperSettings: CropperSettings;

  nacionalidades: [];
  cidades: [];

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private modalService: NgbModal,
    private motoristaService: MotoristaService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private ngbModal: NgbModal,
  ) {}

  ngOnInit() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.cropperDrawSettings.lineDash = true;
    this.cropperSettings.cropperDrawSettings.dragIconStrokeWidth = 0;

    this.avatar = {};
    console.log(this.dataForm);
    

    this.commonService.getNacionalidades((result) => {
      this.nacionalidades = result.data;
    });

    this.commonService.getCidades('SP', (result) => {
      this.cidades = result.data;
    });

    this.motoristaForm = this.formBuilder.group({
      idmotorista: [(history.state.idmotorista || '')],
      nome: ['', Validators.required],
      apelido: ['', Validators.required],
      cpf: ['', Validators.required],
      genero: ['', Validators.required],
      rg: ['', [Validators.required]],
      numerocnh: ['', [Validators.required]],
      orgaoemissorcnh: ['', [Validators.required]],
      categoriacnh: ['', [Validators.required]],
      validadecnh: ['', [Validators.required]],
      emissaocnh: ['', [Validators.required]],
      idnacionalidade: ['', [Validators.required]],
      pis: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      bloqueado: ['', Validators.required],
      datanascimento: ['', [Validators.required /*, invalidDateValidator() */]],
      telefone: ['', [Validators.required]],

      cep: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      logradourocomplemento: ['', []],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      
      email: ['', [Validators.required]],
      senha: ['']
    });

    if (this.dataForm) {

      // this.motoristaService.getById(history.state.idmotorista, (result) => {

        var user = this.dataForm;
        this.motoristaForm.patchValue({
          ...user,
            idmotorista: user.idMotorista,
            orgaoemissor: user.idMotorista,
            numerocnh: user.cnh,
            orgaoemissorcnh: user.orgaoEmissor,
            categoriacnh: user.categoria,
            validadecnh: user.validade,
            emissaocnh: user.emissao,
            idnacionalidade: user.idNacionalidade
        });

        this.loading = false;
      // });
    } else {
      this.loading = false;
    }
  }
  

  onSubmit() {
    
    _.map(this.motoristaForm.controls, (item) => {
      item.markAsDirty();

      if(item.status != 'VALID')
        console.log(item);
    });

    console.log(this.motoristaForm, params);

    if(this.motoristaForm.invalid)
      return;

    var params = { ... this.motoristaForm.value };
    params.datanascimento = moment(params.datanascimento, 'DDMMYYYY').format('YYYY-MM-DD');
    params.emissaocnh = moment(params.emissaocnh, 'DDMMYYYY').format('YYYY-MM-DD');
    params.validadecnh = moment(params.validadecnh, 'DDMMYYYY').format('YYYY-MM-DD');
    params.idnacionalidade = parseInt(params.idnacionalidade);
    params.login = params.email;
    
    if(this.avatar.image) {
      params.avatar = this.avatar.image.split(',')[1];
      params.avatarextensao = this.avatar.image.split(',')[0].split(';')[0].replace('data:image/', '');
    }

    this.motoristaService.inserir(params, (result) => {
      if (result.success) {

        this.toastr.success('Alterações salvas com sucesso', 'Tudo certo!', { timeOut: 3000 });
        this.router.navigateByUrl('dashboard/v7');
      } else {
        this.toastr.error('Desculpe, houve um erro durante sua requisição. Tickect: ' + result.exceptionTicket);
      }
    }, this.motoristaForm);
  }

  onCancel() {
    this.router.navigateByUrl('dashboard/v7');
  }

  onDelete(content) {

    this.ngbModal.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {

        this.loading = true;
        if (result === 'excluir') {

          this.motoristaService.excluir(this.motoristaForm.controls['idmotorista'].value, (result) => {

            this.loading = false;
            if (result.success) {

              this.toastr.success('Motorista excluído com sucesso', 'Tudo certo!', { timeOut: 3000 });
              this.router.navigateByUrl('dashboard/v7');
            }
          });
        }

      }, (reason) => {
        this.loading = false;
      });
  }

  carregarEndereco() {

    var cep = this.motoristaForm.controls['cep'].value;

    if(!cep || cep.length !== 8) return;

    this.loading = true;
    this.commonService.getEndereco(`${cep.substr(0, 5)}-${cep.substr(5, 3)}`, (result) => {
      
      this.loading = false;

      if(result.data) {
        this.motoristaForm.controls['bairro'].setValue(result.data.bairro);
        this.motoristaForm.controls['cidade'].setValue(result.data.cidade);
        this.motoristaForm.controls['logradouro'].setValue(result.data.logradouro);
      }
    });
  }

  openCropper(modal) {
    this.ngbModal.open(modal, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(result, this.avatar);

        // Se usuário já tiver id... submeter; se não, aguardar até o response de 'Salvar usuário'

      }, (reason) => {
        this.toastr.error('Algo deu errado durante o processamento da imagem selecionada', 'Oops...', { timeOut: 3000 });
      });
  }
}

@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.scss']
})
export class DriverTableComponent implements OnInit {
  motoristas$;
  temp = [];
  rows = [];
  modalOption: NgbModalOptions = {};
  motoristaForm: FormGroup;
  loading: boolean = true;

  constructor(
    private motoristaService: MotoristaService,
    private router: Router,
    private modalService: NgbModal,
    private ngbModal: NgbModal,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this.loading = true;
    
    this.motoristaService.getAll(res => {
      let allDrivers = res;
      if(!this.authService.sindicato) 
        allDrivers = allDrivers.filter(v => v.idEmpresaVinculada === this.authService.user.idEmpresa);

      console.log(allDrivers)
      this.motoristas$ = allDrivers;
      this.rows = allDrivers;
      this.temp = allDrivers;
      this.loading = false;
			console.log(this.motoristas$);
		});
  }

  edit(id){
    console.log(`Editar item ${id}`);
    this.open(id);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.motoristas$ = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  onDelete(id, content) {
    console.log(`Deletar item ${id}`);
    this.ngbModal.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {

        // this.loading = true;
        // if (result === 'excluir') {

        //   this.motoristaService.excluir(this.motoristaForm.controls['idmotorista'].value, (result) => {

        //     this.loading = false;
        //     if (result.success) {

        //       this.toastr.success('Motorista excluído com sucesso', 'Tudo certo!', { timeOut: 3000 });
        //       this.router.navigateByUrl('dashboard/v7');
        //     }
        //   });
        // }

      }, (reason) => {
        this.loading = false;
      });
  }

  onActivate(event) {

    // if (event.type == 'click') {

    //   this.router.navigateByUrl('forms/campanha', {
    //     state: {
    //       idcampanha: event.row.idcampanha
    //     }
    //   });
    // }
  }

  open(id) {
    this.modalOption.backdrop = 'static';
    this.modalOption.size = 'lg';
    
    const modalRef = this.modalService.open(NgbdModalContent, this.modalOption);
    modalRef.componentInstance.dataForm = this.motoristas$.find(el => el.idMotorista === id)
  }
}
