module TaskDestroy
  class TaskDestroy
    def success
      @success_template = {
        status: {
          code: 200,
          message: "Success"
        },
        message: "Task Destroyed"
      }

      return @success_template
    end
  end
end