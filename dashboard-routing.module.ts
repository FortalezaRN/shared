import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAnalyticsComponent } from './dashboard-analytics/dashboard-analytics.component';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { DashboardCampaignComponent } from './dashboard-campaign/dashboard-campaign.component';
import { DashboardFinanceComponent } from './dashboard-finance/dashboard-finance.component';
import { DashboardStockComponent } from './dashboard-stock/dashboard-stock.component';
import { DashboardProductsComponent } from './dashboard-products/dashboard-products.component';
import { DashboardEventComponent } from './dashboard-event/dashboard-event.component';
import { DashboardSindicatoComponent } from './dashboard-sindicato/dashboard-sindicato.component';
import { DashboardBonusComponent } from './dashboard-bonus/dashboard-bonus.component';
import { DashboardSindicatoMapaComponent } from './dashboard-sindicato-mapa/dashboard-sindicato-mapa.component';
import { AuthSindicato } from 'src/app/shared/services/auth.sindicato';
import { AuthSuperUser } from 'src/app/shared/services/auth.su';

const routes: Routes = [
  {
    path: 'v1',
    component: DashboardAnalyticsComponent
  },
  {
    path: 'v2',
    component: DashboardSalesComponent
  },
  {
    path: 'v3',
    component: DashboardCampaignComponent
  },
  {
    path: 'v4',
    component: DashboardFinanceComponent
  },
  {
    path: 'v5',
    component: DashboardStockComponent
  },
  {
    path: 'v6',
    component: DashboardProductsComponent
  },
  {
    path: 'v7',
    component: DashboardEventComponent
  },
  {
    path: 'sindicato',
    canActivate:[AuthSindicato],
    component: DashboardSindicatoMapaComponent
  },
  {
    path: 'mapa',
    canActivate:[AuthSindicato],
    component: DashboardSindicatoMapaComponent
  },
  {
    path: 'v8',
    component: DashboardBonusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
