require './lib/json_templates/task_create.rb'
require './lib/json_templates/task_update.rb'
require './lib/json_templates/task_destroy.rb'
require './lib/json_templates/task_new.rb'

module Api
  module V1
    class TaskController < ApplicationController

      def create
        @create = TaskCreate.new
        @body = JSON.parse(request.raw_post)

        @category = find_category(@body)
        # parse date
        @due_date = DateTime.new(
          @body["due_date"]["year"],
          @body["due_date"]["month"],
          @body["due_date"]["day"],
          @body["due_date"]["hour"],
          @body["due_date"]["minute"],          
        )


        @task = @category.tasks.create(
          name: @body["name"],
          body: @body["body"],
          is_completed: false,
          due_date: @due_date
        )

        if @task.save
          render json: @create.success
        else
          @create.errors = @task.errors
          render json: @create.fail
        end

      end

      def new
        @new = TaskNew.new 

        @category = find_category(JSON.parse({
          project_id: params["project_id"],
          category_id: params["category_id"]
        }.to_json))
        @task = @category.tasks.all

        @new.data = @task
        render json: @new.success

      end

      def update
        @update = TaskUpdate.new
        @body = JSON.parse(request.raw_post)
        @category = find_category(@body)
        # parse date
        @due_date = DateTime.new(
          @body["due_date"]["year"],
          @body["due_date"]["month"],
          @body["due_date"]["day"],
          @body["due_date"]["hour"],
          @body["due_date"]["minute"],          
        )

        @task = @category.tasks.find(@body["id"])

        if @task.update(
          name: @body["name"],
          body: @body["body"],
          is_completed: false,
          due_date: @due_date
        )
          render json: @update.success
        else
          @update.errors = @task.errors
          render json: @update.fail
        end
      end

      def destroy
        @destroy = TaskDestroy.new
        @body = JSON.parse(request.raw_post)

        @category = find_category(@body)

        @task = @category.tasks.find(@body['id'])

        @task.destroy
        render json: @destroy.success   
      end

      private
      include TaskCreate
      include TaskNew
      include TaskUpdate
      include TaskDestroy

      def find_category(body)
        user = User.find(@id)
        project = user.projects.find(body["project_id"])
        return project.categories.find(body["category_id"])
      end
    end
  end
end