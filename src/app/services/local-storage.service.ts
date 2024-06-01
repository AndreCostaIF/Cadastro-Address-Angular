import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Salva JSON no localStorage
  setItem(key: string, value: any): void {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
  }

  // Recupera JSON do localStorage
  getItem(key: string): any {
    const jsonString = localStorage.getItem(key);
    if (jsonString) {
      return JSON.parse(jsonString);
    }
    return null;
  }

  // Remove um item do localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpa todo o localStorage
  clear(): void {
    localStorage.clear();
  }
}
