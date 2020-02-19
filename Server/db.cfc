<cfcomponent displayname="User">
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

   <cffunction name="check" returntype="boolean" access="remote">

      <cfargument name="username" type="string" required="true">
      <cfargument name="password" type="string" required="true">

      <cfquery name="user" datasource="localDB">
          SELECT *
          FROM Users
          WHERE Username = '#username#' AND Pass = '#password#'
      </cfquery>

      <cfif user.recordCount eq 0>
         <cfreturn false>
      </cfif>

      <cfreturn true>
  </cffunction>
  </cfcomponent>