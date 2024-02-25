/*
  Matteo Vaccari -- esercizio per Sistemi Operativi, a.a. 2005/06
 */
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

#define MAX_LINE 1000

void print_prompt(void) {
  printf("> ");
}

static char command[MAX_LINE];

void read_line(void) {
  fgets(command, MAX_LINE, stdin);
  // elimina il '\n' finale
  command[strlen(command)-1] = '\0';
}

void execute_command() {
  // TODO: accettare anche comandi con argomenti
  if (0 == strlen(command)) return;

  int pid = fork();
  if (-1 == pid) {
    perror("fork fallita:");
    return;
  }
  if (0 == pid) {
    execlp(command, command, NULL);
    perror("exec fallita:");
    exit(EXIT_FAILURE); // termina il proc. figlio
  } 
}

void wait_for_termination(void) {
  int status;
  int pid = wait(&status);
  printf("Process %d terminated with status %d\n", pid, status);
}


int main() {
  printf("Shell minimale.  Terminare con ^C\n");
  while (1) {
    print_prompt();
    read_line();
    execute_command();
    wait_for_termination();
  }
}
