
#include <stdio.h>
#include <stdlib.h>

int *mat;
int N;

int m(int r, int c, int value) {
  mat[r*N + c] = value;
}

int main(int argc, char **argv) {
  int r, c, size, sizeMB;
  
  N = atoi(argv[1]);
  size = N*N*sizeof(int);
  sizeMB = size / (1024*1024);

  printf("sizeMB = %d\n", sizeMB);

  getchar();

  mat = malloc(size);
  if (!mat) {
    perror("malloc");
    exit(EXIT_FAILURE);
  }
  printf("malloc eseguita\n");
  getchar();

  for (r=0; r<N; r++) {
    for (c=0; c<N; c++) {
      m(c, r, r+c);
    }
  }
}
