from collections import deque

# Function to check if a state is the goal state
def is_goal_state(state):
    return state == [1, 2, 3, 4, 5, 6, 7, 8, 0]

# Function to get the possible actions (valid moves) for the blank tile
def get_actions(state):
    blank_index = state.index(0)
    actions = []
    if blank_index % 3 > 0:
        actions.append('left')
    if blank_index % 3 < 2:
        actions.append('right')
    if blank_index >= 3:
        actions.append('up')
    if blank_index < 6:
        actions.append('down')
    return actions

# Function to apply an action to a state and return the new state
def apply_action(state, action):
    new_state = state.copy()
    blank_index = state.index(0)
    if action == 'left':
        new_state[blank_index], new_state[blank_index - 1] = new_state[blank_index - 1], new_state[blank_index]
    elif action == 'right':
        new_state[blank_index], new_state[blank_index + 1] = new_state[blank_index + 1], new_state[blank_index]
    elif action == 'up':
        new_state[blank_index], new_state[blank_index - 3] = new_state[blank_index - 3], new_state[blank_index]
    elif action == 'down':
        new_state[blank_index], new_state[blank_index + 3] = new_state[blank_index + 3], new_state[blank_index]
    return new_state

# Function to perform BFS and find the path to the goal state
def bfs_search(initial_state):
    queue = deque([(initial_state, [])])  # Each element in the queue is a tuple (state, path)
    visited = set()
    
    while queue:
        current_state, path = queue.popleft()
        visited.add(tuple(current_state))
        
        if is_goal_state(current_state):
            return path
        
        for action in get_actions(current_state):
            new_state = apply_action(current_state, action)
            if tuple(new_state) not in visited:
                queue.append((new_state, path + [action]))
                
    return None

# Function to print the steps taken to solve the puzzle
def print_solution(initial_state, steps):
    print("Initial State:")
    print_state(initial_state)
    print("\nSteps to Goal State:")
    state = initial_state.copy()
    for step in steps:
        state = apply_action(state, step)
        print_state(state)
        print()

# Function to print the puzzle state in a readable format
def print_state(state):
    for i in range(0, 9, 3):
        print(state[i:i+3])

# Example usage:
if __name__ == "__main__":
    initial_state = [1, 2, 3, 4, 0, 5, 6, 7, 8]
    steps_to_goal = bfs_search(initial_state)
    if steps_to_goal:
        print_solution(initial_state, steps_to_goal)
    else:
        print("Goal state not reachable from the initial state.")
