const DEFAULT_TIMEOUT = 2000;

export class Redis {
  private readonly url: string;
  private readonly token: string;
  private readonly headers: { [key: string]: string };

  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
    this.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  async get<T>(key: string): Promise<T> {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

    try {
      const response = await fetch(`${this.url}/GET/${key}`, {
        signal: controller.signal,
        headers: this.headers,
      });
      const json = await response.json();
      return JSON.parse(json.result) as T;
    } catch (error) {
      throw error;
    }
  }

  async set(key: string, value: any): Promise<void> {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
    try {
      await fetch(`${this.url}/SET/${key}`, {
        method: "POST",
        signal: controller.signal,
        headers: this.headers,
        body: JSON.stringify(value),
      });
    } catch (error) {
      throw error;
    }
  }
}
