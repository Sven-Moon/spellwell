import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpellsComponent } from './modules/spells/spells.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  {
    path: 'spells', component: SpellsComponent,
    loadChildren: () => import('./modules/spells/spells.module')
    .then((m) => m.SpellsModule)
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
