import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardAnalyticsComponent } from './dashboard-analytics/dashboard-analytics.component';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { DashboardCampaignComponent } from './dashboard-campaign/dashboard-campaign.component';
import { DashboardFinanceComponent } from './dashboard-finance/dashboard-finance.component';
import { DashboardStockComponent } from './dashboard-stock/dashboard-stock.component';
import { DashboardProductsComponent } from './dashboard-products/dashboard-products.component';
import { DashboardEventComponent } from './dashboard-event/dashboard-event.component';
import { DashboardBonusComponent } from './dashboard-bonus/dashboard-bonus.component';
import { DashboardSindicatoComponent } from './dashboard-sindicato/dashboard-sindicato.component';
import { DashboardSindicatoMapaComponent } from './dashboard-sindicato-mapa/dashboard-sindicato-mapa.component';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    DashboardRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzJVLBPTN_g63auM5KNpJ9Ho7W5__kimM'    
    }),
  ],
  declarations: [DashboardAnalyticsComponent, DashboardSalesComponent, DashboardCampaignComponent, DashboardFinanceComponent, DashboardStockComponent, DashboardProductsComponent, DashboardEventComponent, DashboardBonusComponent, DashboardSindicatoComponent, DashboardSindicatoMapaComponent]
})
export class DashboardModule { }
