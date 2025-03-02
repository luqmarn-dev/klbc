import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import * as ExcelJS from 'exceljs';
import { Database, ref, get, child } from '@angular/fire/database';
import * as QRCode from 'qrcode';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-admin',
  imports: [ImageModule, ButtonModule, DialogModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  db = inject(Database);
  showQr = false;
  qrImage = '';
  constructor(private router: Router) {}

  onExport() {
    const dbRef = ref(this.db);
    get(child(dbRef, 'attendees')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const workbook = new ExcelJS.Workbook();

        Object.keys(data).forEach((date) => {
          const attendees = data[date];
          const worksheet = workbook.addWorksheet(date);

          const keys = Object.keys(attendees[Object.keys(attendees)[0]]);
          worksheet.columns = keys.map((key) => ({ header: key, key }));

          Object.values(attendees).forEach((attendee: any) => {
            worksheet.addRow(attendee);
          });
        });

        workbook.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'KLBC-attendees.xlsx';
          a.click();
          window.URL.revokeObjectURL(url);
        });
      }
    });
  }

  onQR() {
    const loginUrl = `https:klbc-login.web.app/login`;
    QRCode.toDataURL(loginUrl, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      this.qrImage = url;
      this.showQr = true;
    });
  }

  onHome() {
    this.router.navigate(['/']);
  }
}
