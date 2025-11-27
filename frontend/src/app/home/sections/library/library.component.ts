import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPdfService } from '../../../services/uploadPdf.service';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  selectedFile: File | null = null;
  uploadProgress = 0;
  uploadMessage = '';
  isUploading = false;
  files: any[] = [];
  isLoadingFiles = false;

  constructor(private uploadService: UploadPdfService) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      // Validar que sea PDF
      if (file.type !== 'application/pdf') {
        this.uploadMessage = '⚠️ Solo se permiten archivos PDF';
        this.selectedFile = null;
        return;
      }
      
      // Validar tamaño máximo (10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.uploadMessage = '⚠️ El archivo excede el tamaño máximo de 10MB';
        this.selectedFile = null;
        return;
      }
      
      this.selectedFile = file;
      this.uploadMessage = '';
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.uploadMessage = '⚠️ Por favor selecciona un archivo PDF';
      return;
    }

    this.isUploading = true;
    this.uploadMessage = 'Subiendo archivo...';

    this.uploadService.uploadPdf(this.selectedFile).subscribe({
      next: (response) => {
        this.uploadMessage = '✅ Archivo subido correctamente';
        this.isUploading = false;
        this.selectedFile = null;
        
        // Resetear el input file
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        // Recargar la lista de archivos
        this.loadFiles();
      },
      error: (error) => {
        console.error('Error al subir archivo:', error);
        this.uploadMessage = '❌ Error al subir el archivo: ' + (error.error?.error || error.message);
        this.isUploading = false;
      }
    });
  }

  loadFiles(): void {
    this.isLoadingFiles = true;
    this.uploadService.listFiles().subscribe({
      next: (files) => {
        this.files = files.map(file => ({
          name: this.extractFileName(file.Key),
          key: file.Key,
          size: this.formatFileSize(file.Size),
          lastModified: new Date(file.LastModified).toLocaleDateString('es-ES')
        }));
        this.isLoadingFiles = false;
      },
      error: (error) => {
        console.error('Error al cargar archivos:', error);
        this.isLoadingFiles = false;
      }
    });
  }

  extractFileName(key: string): string {
    // Extrae el nombre del archivo desde la key (uploads/timestamp-filename.pdf)
    const parts = key.split('/');
    const filename = parts[parts.length - 1];
    // Remueve el timestamp del principio
    return filename.replace(/^\d+-/, '');
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  viewFile(file: any): void {
    const url = this.getFileUrl(file.key);
    window.open(url, '_blank');
  }

  downloadFile(file: any): void {
    const url = this.getFileUrl(file.key);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private getFileUrl(key: string): string {
    const bucket = 'biblio-app-bucket';
    const region = 'us-east-1';
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  }
}