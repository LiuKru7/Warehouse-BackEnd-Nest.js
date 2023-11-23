import { PartialType } from '@nestjs/mapped-types';
import { CreateShockDto } from './create-shock.dto';

export class UpdateShockDto extends PartialType(CreateShockDto) {}
