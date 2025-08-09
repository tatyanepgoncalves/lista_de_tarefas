export type TaskStatus = 'pendente' | 'em andamento' | 'concluída'


export type TaskPriority = 'baixa' | 'média' | 'alta'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  category: string
  createdAt: Date
  updatedAt?: Date
  finishAt?: Date
  completedAt?: Date
}
