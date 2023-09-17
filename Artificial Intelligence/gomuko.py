import random

# Constants
BOARD_SIZE = 10
AI_PLAYER = "X"
OPPONENT_PLAYER = "O"
EMPTY = " "

# Evaluate a line for its potential
def evaluate_line(line, player):
    ai_count = line.count(player)
    opponent_count = line.count(OPPONENT_PLAYER)
    
    if ai_count == 5:
        return 1000
    elif opponent_count == 5:
        return -1000
    elif ai_count == 4 and EMPTY in line:
        return 100
    elif opponent_count == 4 and EMPTY in line:
        return -100
    elif ai_count == 3 and EMPTY in line:
        return 10
    elif opponent_count == 3 and EMPTY in line:
        return -10
    elif ai_count == 2 and EMPTY in line:
        return 1
    elif opponent_count == 2 and EMPTY in line:
        return -1
    else:
        return 0

# Evaluate the entire board
def evaluate_board(board, player):
    total_score = 0
    
    for row in board:
        for i in range(BOARD_SIZE - 5 + 1):
            total_score += evaluate_line(row[i:i+5], player)
    
    for col in range(BOARD_SIZE):
        for i in range(BOARD_SIZE - 5 + 1):
            column = [board[j][col] for j in range(i, i+5)]
            total_score += evaluate_line(column, player)
    
    for i in range(BOARD_SIZE - 5 + 1):
        for j in range(BOARD_SIZE - 5 + 1):
            diagonal = [board[i+k][j+k] for k in range(5)]
            total_score += evaluate_line(diagonal, player)
    
    for i in range(BOARD_SIZE - 5 + 1):
        for j in range(BOARD_SIZE - 5 + 1):
            diagonal = [board[i+k][j+4-k] for k in range(5)]
            total_score += evaluate_line(diagonal, player)
    
    return total_score

# Find the best move using Minimax with alpha-beta pruning
def find_best_move(board, depth, maximizing_player):
    if depth == 0:
        return None, evaluate_board(board, AI_PLAYER)
    
    if maximizing_player:
        best_move = None
        best_score = float("-inf")
        for i in range(BOARD_SIZE):
            for j in range(BOARD_SIZE):
                if board[i][j] == EMPTY:
                    board[i][j] = AI_PLAYER
                    _, score = find_best_move(board, depth - 1, False)
                    board[i][j] = EMPTY
                    if score > best_score:
                        best_score = score
                        best_move = (i, j)
        return best_move, best_score
    else:
        best_move = None
        best_score = float("inf")
        for i in range(BOARD_SIZE):
            for j in range(BOARD_SIZE):
                if board[i][j] == EMPTY:
                    board[i][j] = OPPONENT_PLAYER
                    _, score = find_best_move(board, depth - 1, True)
                    board[i][j] = EMPTY
                    if score < best_score:
                        best_score = score
                        best_move = (i, j)
        return best_move, best_score

# Main game loop
def main():
    board = [[EMPTY] * BOARD_SIZE for _ in range(BOARD_SIZE)]
    
    while True:
        # AI's turn
        ai_move, _ = find_best_move(board, depth=2, maximizing_player=True)
        if ai_move:
            board[ai_move[0]][ai_move[1]] = AI_PLAYER
            print("AI's move:", ai_move)
        else:
            print("AI cannot move.")
            break
        
        # Print the board
        for row in board:
            print(" ".join(row))
        print()
        
        # Check if AI wins
        if evaluate_board(board, AI_PLAYER) >= 1000:
            print("AI wins!")
            break
        
        # Opponent's turn
        opponent_move = input("Enter opponent's move (row col): ")
        opponent_row, opponent_col = map(int, opponent_move.split())
        board[opponent_row][opponent_col] = OPPONENT_PLAYER
        
        # Print the board
        for row in board:
            print(" ".join(row))
        print()
        
        # Check if opponent wins
        if evaluate_board(board, OPPONENT_PLAYER) <= -1000:
            print("Opponent wins!")
            break

if __name__ == "__main__":
    main()
