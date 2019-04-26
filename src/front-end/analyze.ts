export default async (body: string): Promise<any> => {
  return fetch('/api/analyze', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res: Response) => res.json())
    .then((json: any) => json)
}
