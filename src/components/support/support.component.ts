import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-support',
  standalone: true,  // Make the component standalone
  imports: [FormsModule, CommonModule],  // Add CommonModule and FormsModule here
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  supportTicket = {
    issueType: '',
    description: ''
  };

  // Array to iterate for support issues
  issueTypes = ['Technical Issue', 'Billing Issue', 'Account Issue', 'General Inquiry'];

  onSubmit(): void {
    // Handle support ticket submission here
    console.log('Support ticket submitted:', this.supportTicket);
    alert('Thank you for reaching out to us!');
  }
}
