import { SetMetadata } from '@nestjs/common';

export const AdminKey = 'isAdmin';
export const Admin = (admin) => SetMetadata(AdminKey, admin);
