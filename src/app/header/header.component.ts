import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated: boolean = false;
  constructor(
    private dataStorageSvc: DataStorageService,
    private authSvc: AuthService
  ) {}
  ngOnInit() {
    this.userSub = this.authSvc.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }
  onSaveData() {
    this.dataStorageSvc.recipeStorageHandler();
  }
  onFetchData() {
    this.dataStorageSvc.getRecipesHandler().subscribe();
  }
  onLogout() {
    this.authSvc.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
