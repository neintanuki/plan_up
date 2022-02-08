module Register
  class Register

    def success
      @success_template = {
        status: {
          code: 200,
          message: "Success"
        },
        message: "User successfully created"
      }

      return @success_template
    end

    def fail(errors)
      @fail_template = {
        status: {
          code: 401,
          message: "Unauthorized"
        },
        message: "User not created",
        errors: errors
      }

      return @fail_template
    end
  end
end