import numpy as np
import time

with open('data_moves.txt') as f:
    moves = np.array(list(map(int, f.read().split(','))))
with open('data_boards.txt') as f:
    boards = f.read().split('\n\n')

print(moves)

b = []
# for i, board in enumerate(boards):
#     with open(f'board_{i}.txt', 'wt') as f:
#         f.write(board)
#         time.sleep(0.1)
for i, board in enumerate(boards):
    b.append(np.genfromtxt(f'board_{i}.txt'))
boards = np.stack(b)

checks = np.zeros_like(boards)

for move in moves:
    checks += boards == move
    # row_sums = np.any(np.sum(checks, axis=2) == 5, axis=-1)
    # print(row_sums)
    row_bingos = np.any(np.sum(checks, axis=2) == 5, axis=-1)
    col_bingos = np.any(np.sum(checks, axis=1) == 5, axis=-1)
    if any(row_bingos + col_bingos):
        print(row_bingos + col_bingos)
        b = np.argmax(row_bingos + col_bingos)
        print(b, move)
        print(boards[b])
        print(checks[b])
        unmarked = boards[b] * (1 - checks[b])
        print(np.sum(unmarked))
        print(np.sum(unmarked) * move)
        break

print(move)
