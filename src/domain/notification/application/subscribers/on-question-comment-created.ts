import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionCommentCreatedEvent } from '@/domain/forum/enterprise/events/question-comment-created-event'

export class OnQuestionCommentCreated implements EventHandler {
  constructor(
    private questionCommentRepository: QuestionCommentsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewQuestionCommentNotification.bind(this),
      QuestionCommentCreatedEvent.name,
    )
  }

  private async sendNewQuestionCommentNotification({
    questionComment,
  }: QuestionCommentCreatedEvent) {
    const question = await this.questionCommentRepository.findById(
      questionComment.id.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question?.authorId.toString(),
        title: `Novo comentário na pergunta criada"`,
        content: questionComment?.content.substring(0, 40).concat('...'),
      })
    }
  }
}
