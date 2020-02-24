<cfcomponent displayname="User">
   <!---
   <cffunction name="retrieveUsers"
     hint="Gets all Users from the database" returntype="array" access="remote">

     <cfset UserList = arrayNew(1)>

     <cfquery name="users" datasource="localDB">
        select * from Users
     </cfquery>

     <cfloop query = "users">
        <cfoutput>
           <cfset u = [
              username = #Username#,
              password = #Pass#
           ]>
           <cfset arrayAppend(UserList, #u#)>
        </cfoutput>
     </cfloop>


      <cfreturn UserList>
   </cffunction>
   --->

   <cfheader name="Access-Control-Allow-Origin" value="*">
   <cfheader name="Access-Control-Allow-Methods" value="GET,PUT,POST,DELETE">
   <cfheader name="Access-Control-Allow-Headers" value="Content-Type">

   <cffunction name="check" returntype="boolean" access="remote">

      <cfargument name="username" type="string" required="true">
      <cfargument name="password" type="string" required="true">

      <cfscript>
         myfile = FileOpen("C:\ColdFusion2018\cfusion\wwwroot\dbinfo.txt", "read");
         dbUsername = FileReadLine(myfile);
         dbPassword = FileReadLine(myfile);
         FileClose(myfile);
      </cfscript>


      <cfquery name="user" datasource="awsMicrosoftSQLServer" username="#dbUsername#" password="#dbPassword#">
          SELECT *
          FROM hcUser
          WHERE username = '#username#' AND pswd = '#password#'
      </cfquery>

      <cfif user.recordCount EQ 0>
         <cfreturn false>
      </cfif>

      <cfreturn true>
  </cffunction>
</cfcomponent>