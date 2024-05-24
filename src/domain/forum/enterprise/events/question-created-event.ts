import { DomainEvent } from '@/core/events/domain-event'
import { Question } from '../entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class QuestionCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public eventQuestion: Question

  constructor(question: Question) {
    this.eventQuestion = question
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.eventQuestion.id
  }
}
