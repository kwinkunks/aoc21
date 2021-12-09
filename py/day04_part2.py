import numpy as np
import time

with open('data_moves.txt') as f:
    moves = np.array(list(map(int, f.read().split(','))))
with open('data_boards.txt') as f:
    boards = f.read().split('\n\n')

b = []
# for i, board in enumerate(boards):
#     with open(f'board_{i}.txt', 'wt') as f:
#         f.write(board)
#         time.sleep(0.1)
for i, board in enumerate(boards):
    b.append(np.genfromtxt(f'board_{i}.txt'))
boards = np.stack(b)

checks = np.zeros_like(boards)

winners = dict()

for move in moves:
    checks += boards == move
    row_bingos = np.any(np.sum(checks, axis=2) == 5, axis=-1)
    col_bingos = np.any(np.sum(checks, axis=1) == 5, axis=-1)
    if any(row_bingos + col_bingos):
        b, = np.where(row_bingos + col_bingos)
        for x in b:
            winners.update({x: 1})
    if len(winners) == len(boards):
        break

b = 44
unmarked = boards[b] * (1 - checks[b])
print(np.sum(unmarked) * move)
