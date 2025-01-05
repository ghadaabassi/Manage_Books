import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private readonly IMAGES_PATH = 'assets/books/';
/// creates a key-value pair in local storage with the image path as the key and the base64 string as the value
  async saveImage(file: File): Promise<string> {

    const timestamp = new Date().getTime();
    const filename = `${timestamp}-${file.name}`;
    const path = `${this.IMAGES_PATH}${filename}`;

    const base64 = await this.fileToBase64(file);
    localStorage.setItem(path, base64);

    return path;
  }

  getImageUrl(path: string): string {
    const base64 = localStorage.getItem(path);
    return base64 || path;
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
