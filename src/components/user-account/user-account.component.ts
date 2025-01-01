import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

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
  private premiumApi = environment.backendless.PREMIUM_API;
  isEditing: boolean = false;
  paymentLink: string = environment.pay;

  updatedData = {
    username: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

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
    const userRoles = localStorage.getItem('userRoles');
    const roles = userRoles ? JSON.parse(userRoles) : [];
    return roles.includes('Premium');
  }

  upgradeToPremium(): void {
    console.log('Starting Premium upgrade...');

    const email = this.userData?.email;

    if (!email) {
      console.error('User email is missing!');
      return;
    }

    this.http.post(this.premiumApi, JSON.stringify(email)).subscribe(
      async (response) => {
        try {
          const roles = await Backendless.UserService.getUserRoles();
          console.log('Updated User Roles:', roles);

          if (roles.includes('Premium')) {
            console.log('User successfully upgraded to Premium.');

            localStorage.setItem('userRoles', JSON.stringify(roles));

            window.location.href = this.paymentLink;
          } else {
            console.error('User role was not updated to Premium.');
          }
        } catch (error) {
          console.error('Error fetching user roles after upgrade:', error);
        }
      },
      (error) => {
        console.error('Error upgrading user to Premium:', error);
      }
    );
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
