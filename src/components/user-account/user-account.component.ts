import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent {
  userData: any;
  followersCount: number = 0;
  profilePic: string = 'https://i.imgur.com/wvxPV9S.png';
  username: string = 'Eleanor Pena';
  userId: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  async loadUserData(): Promise<void> {
    try {
      const currentUser = await this.authService.getCurrentUserData();

      if (currentUser) {
        this.userData = currentUser;
        this.username = currentUser.username || 'No username';
        this.userId = currentUser.objectId || '';
        this.profilePic = currentUser.profilePicture || this.profilePic;
        this.followersCount = currentUser.followersCount || 0;
      } else {
        console.log('No user is logged in.');
      }
    } catch (error) {
      console.error('Error loading user data: ', error);
    }
  }
}
