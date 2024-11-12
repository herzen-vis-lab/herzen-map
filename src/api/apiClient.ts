import { RequestOptions } from './types'
 
export const apiClient = async (url: string, options: RequestOptions) => {
  const { method, body } = options;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`API request failed: ${error}`);
  }
};
