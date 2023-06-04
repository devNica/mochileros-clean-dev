export interface LoggerAdapterModel {
  LogInfo: (message: string) => void
  LogError: (message: string) => void
}
