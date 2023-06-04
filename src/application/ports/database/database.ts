export interface DatabaseAdapterModel {
  connect: () => Promise<void>
  syncModels: (alter: boolean) => Promise<void>
}
