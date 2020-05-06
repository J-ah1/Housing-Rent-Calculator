component {

    this.applicationTimeout = CreateTimeSpan(10, 0, 0, 0); //10 days
    this.sessionManagement = true;
    this.sessionTimeout = CreateTimeSpan(0, 0, 30, 0); //30 minutes

}