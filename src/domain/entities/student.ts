import { Entity } from '../../core/entities/entity'

interface StrudentProps {
  name: string
}

export class Student extends Entity<StrudentProps> {}
