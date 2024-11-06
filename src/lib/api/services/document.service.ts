import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';

export interface DocumentMetadata {
  type: 'contract' | 'registration' | 'certification' | 'insurance' | 'other';
  ownerId: string;
  ownerType: 'player' | 'team' | 'official';
  validFrom?: string;
  validUntil?: string;
  description?: string;
  tags?: string[];
}

export interface Document {
  id: string;
  url: string;
  metadata: DocumentMetadata;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
  verifiedAt?: string;
}

export const documentService = {
  async uploadDocument(file: File, metadata: DocumentMetadata): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));

    const response = await apiClient.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getDocument(documentId: string): Promise<Document> {
    const response = await apiClient.get(`/documents/${documentId}`);
    return response.data;
  },

  async verifyDocument(documentId: string, verificationDetails: {
    status: 'verified' | 'rejected';
    notes?: string;
  }): Promise<Document> {
    const response = await apiClient.post(`/documents/${documentId}/verify`, verificationDetails);
    return response.data;
  },

  async listDocuments(filters: {
    ownerId?: string;
    type?: string;
    status?: string;
  }): Promise<Document[]> {
    const response = await apiClient.get('/documents', { params: filters });
    return response.data;
  },

  async updateDocument(documentId: string, updates: Partial<DocumentMetadata>): Promise<Document> {
    const response = await apiClient.patch(`/documents/${documentId}`, updates);
    return response.data;
  },

  async deleteDocument(documentId: string): Promise<void> {
    await apiClient.delete(`/documents/${documentId}`);
  },
};