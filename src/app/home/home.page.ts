import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router, private dataService: DataService) {
    this.dataService.isLoading.next(true);
    this.userService.getUsers().subscribe(response => {
      this.dataService.isLoading.next(false);
      this.users = response.data;
      console.log(this.users);
    }, err => {
      this.dataService.isLoading.next(false);
      this.dataService.message.next('Lo sentimos, ocurrió un error');
    });
  }

  goToUser(id: number) {
    this.router.navigate(['user', id]);
  }
}
