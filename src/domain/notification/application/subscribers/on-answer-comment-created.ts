import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerCommentCreatedEvent } from '@/domain/forum/enterprise/events/answer-comment-created-event'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private answerCommentRepository: AnswerCommentsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerCommentNotification.bind(this),
      AnswerCommentCreatedEvent.name,
    )
  }

  private async sendNewAnswerCommentNotification({
    answerComment,
  }: AnswerCommentCreatedEvent) {
    const answer = await this.answerCommentRepository.findById(
      answerComment.id.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer?.authorId.toString(),
        title: `Novo comentário na pergunta criada"`,
        content: answerComment?.content.substring(0, 40).concat('...'),
      })
    }
  }
}
