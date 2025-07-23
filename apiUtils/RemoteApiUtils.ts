class RemoteApiUtils {
   static BASE_API_URL='http://localhost:8080'

 static async postData<T>(endpoint: string, data: T): Promise<Response> {
    return fetch(this.BASE_API_URL + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }


  static async getData(endpoint: string): Promise<Response> {
    return fetch(this.BASE_API_URL + endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }










  static capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  static isEmpty(text: string): boolean {
    return !text || text.trim().length === 0;
  }

  static reverse(text: string): string {
    return text.split('').reverse().join('');
  }
}

export default RemoteApiUtils;
