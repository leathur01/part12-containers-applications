import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { screen } from "@testing-library/react"

import Todo from "../Todos/Todo"

test("renders todo correctly", () => {
    const todo = {
        text: "A thing to do",
        done: false,
    }
    const deleteTodo = jest.fn()
    const completeTodo = jest.fn()

    render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)

    expect(screen.getByText("A thing to do")).toBeInTheDocument()
    expect(screen.getByText("This todo is not done")).toBeInTheDocument()

    fireEvent.click(screen.getByText("Set as done"))
    expect(completeTodo).toHaveBeenCalledTimes(1)
    expect(completeTodo).toHaveBeenCalledWith(todo)

    fireEvent.click(screen.getByText("Delete"))
    expect(deleteTodo).toHaveBeenCalledTimes(1)
    expect(deleteTodo).toHaveBeenCalledWith(todo)
})