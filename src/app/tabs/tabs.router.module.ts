import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'translate',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../translate/translate.module').then(m => m.TranslatePageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: 'identify',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../identify/identify.module').then(m => m.IdentifyPageModule)
          }
        ]
      },
      {
        path: 'label',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../label/label.module').then(m => m.LabelPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/translate',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/translate',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
