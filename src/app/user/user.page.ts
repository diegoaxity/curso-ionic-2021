import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user.model';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: User;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.activatedRoute.params.subscribe(parameters => {
      if (parameters.id) {
        this.dataService.isLoading.next(true);
        this.userService.getSingleUser(parameters.id).subscribe(response => {
          this.dataService.isLoading.next(false);
          this.user = response.data;
        }, err => {
          this.dataService.isLoading.next(false);
          this.dataService.message.next('Lo sentimos, ocurrió un error');
        });
      }
    });
  }

  ngOnInit() {
  }

}
