export const serializeResponseORM = (data: any): any => {
  const r = JSON.stringify(data, null, 2)
  return JSON.parse(r)
}
