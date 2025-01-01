import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
  imports: [CommonModule, FormsModule],
})
export class UserAccountComponent {
  userData: any;
  username: string = '';
  userId: string = '';
  profilePic: string = 'https://i.imgur.com/wvxPV9S.png';

  isEditing: boolean = false;
  paymentLink: string = environment.pay;

  updatedData = {
    username: '',
    email: '',
    password: '',
  };

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
        this.userId = currentUser.objectId;
        this.updatedData.username = currentUser.username || '';
        this.updatedData.email = currentUser.email || '';
      } else {
        console.log('No user is logged in.');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  userHasPremiumRole(): boolean {
    return this.userData.roles.includes('premium');
  }

  upgradeToPremium(): void {
    console.log('Upgrading to premium...');
    window.location.href = this.paymentLink;
    alert('You have been upgraded to Premium!');
  }

  editProfile(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.updatedData = {
      username: this.userData.username,
      email: this.userData.email,
      password: '',
    };
  }

  async saveChanges(): Promise<void> {
    try {
      const updatedUser = await this.authService.updateUserData(
        this.updatedData
      );
      this.userData = updatedUser;
      this.username = updatedUser.username || '';
      this.isEditing = false;

      console.log('User data updated:', updatedUser);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }
}
