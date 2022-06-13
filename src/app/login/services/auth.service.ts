import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDefaultResponse, ILoginResponse } from 'src/app/application/response/response';
import { environment } from 'src/environments/environment';


export function getAuthToken(param: IDefaultResponse): string {
  return param.body.response_data.login_response.token;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.APP_SERVER_URL;
  options: any;
  private data: ILoginResponse;

  /**
   * Constructor
   * @param http The http client object
   */
  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    };
  }

  /**
   * Get an access token
   * @param u The username
   * @param p The password string
   */
  login(u: string, p: string) {
    return this.http.post<IDefaultResponse>(this.apiUrl + 'login', {
      grant_type: 'password',
      client_id: '3',
      client_secret: 'tyQWXh7c6CsWj6p5jHEgxlfhyypOdKsIQIieicBh',
      username: u,
      password: p,
      scope: ''
    }, this.options);
  }

  /**
   * Revoke the authenticated user token
   */
  logout() {
    localStorage.clear();
    return this.http.get(this.apiUrl + '/token/revoke', this.options);
  }

  /**
   * set auth user data
   */
  setData(data: ILoginResponse) {
    this.data = data;
  }

  /**
   * 
   * @returns auth user data
   */
  getData(): ILoginResponse {
    return this.data;
  }

  /**
   * Get permission(s)
   * @param id? Permission Id 
   * @returns Observable<ArrayBuffer>
   */
  // get_permission(id?: number) {    
  //   return this.http.get<IDefaultResponse>(this.apiUrl + `/permission/${id? id: ''}`, this.options);
  // }

  /**
   * Get role(s)
   * @param id? Role Id 
   * @returns Observable<ArrayBuffer>
   */
  //  get_role(id?: number) {    
  //   return this.http.get<IDefaultResponse>(this.apiUrl + `/role/${id? id: ''}`, this.options);
  // }

  /**
   * Get login response from api
   * 
   * @param param any
   * @returns response
   */
  getLoginResponse(param: any) {
    return param.body.response_data.login_response;
  }
}
