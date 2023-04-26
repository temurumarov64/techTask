import { Component, OnInit } from '@angular/core';
import { CountService } from 'src/app/services/count.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public counterValue: number = 0;
  public incrementValue: number = 1;
  constructor(private countService: CountService) {}

  ngOnInit(): void {
    this.countService.getStartCount().subscribe((response) => {
      console.log(response);
      this.counterValue = response;
    });
  }

  toCount() {
    return this.counterValue == 0 ? 1 : this.counterValue * 2;
  }

  openModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  handleConfirm() {
    this.increment();
    this.closeModal();
  }

  increment() {
    this.countService.getIncrement().subscribe((response) => {
      console.log(response);
      this.incrementValue = response;

      this.countService.getCount().subscribe((response) => {
        console.log(response);
        this.counterValue = response;
      });
    });
  }
}
