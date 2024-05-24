import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { QuestionCreatedEvent } from '@/domain/forum/enterprise/events/question-created-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnQuestionCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewQuestionNotification.bind(this),
      QuestionCreatedEvent.name,
    )
  }

  private async sendNewQuestionNotification({
    eventQuestion,
  }: QuestionCreatedEvent) {
    const question = await this.questionsRepository.findById(
      eventQuestion.id.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question?.authorId.toString(),
        title: `Nova pergunta criada: "${question?.title.substring(0, 40).concat('...')}"`,
        content: question.excerpt,
      })
    }
  }
}
