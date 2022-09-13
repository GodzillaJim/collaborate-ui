export class TaskRoutes {
  public static BASE_URL = "";

  /* Create new task, takes body: { name: string }  */
  public static get CREATE_TASK() {
    return this.BASE_URL + "/api/v1/task";
  }

  /* Gets specific task using ID, takes body: { id: string} */
  public static get GET_TASK_BY_ID() {
    return this.BASE_URL + "/api/v1/task/id";
  }
  public static get GET_USER_TASKS() {
    return this.BASE_URL + "/api/v1/task/user"
  }
}
