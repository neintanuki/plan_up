module Register
  class Register
    attr_writer :errors

    def initialize
      @errors
    end

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

    def fail
      @fail_template = {
        status: {
          code: 401,
          message: "Unauthorized"
        },
        message: "User not created",
        errors: @errors
      }

      return @fail_template
    end
  end
end