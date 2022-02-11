module ProjectUpdate
  class ProjectUpdate
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
        message: "Project Updated"
      }

      return @success_template
    end

    def fail
      @fail_template = {
        status: {
          code: 400,
          message: "Bad Request"
        },
        message: "Bad Request",
        errors: @errors
      }

      return @fail_template
    end

  end
end