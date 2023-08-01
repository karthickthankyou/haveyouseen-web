import { Subject } from 'rxjs'
import { NotificationType } from '@haveyouseen-org/types'

export const notification$ = new Subject<Omit<NotificationType, 'id'>>()
