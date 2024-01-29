import { SetMetadata } from '@nestjs/common';

export const OwnerKey = 'isOwner';
export const Owner = (owner) => SetMetadata(OwnerKey, owner);
