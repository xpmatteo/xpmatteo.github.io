#include <sys/times.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <fcntl.h>

void check_error(int result, char * message) {
  if (-1 == result) {
    perror(message);
    exit(EXIT_FAILURE);
  }
}

void io_bound() {
  int i;
  for (i=0; i<1000*1000; i++) {
    int fd = open("/etc/passwd", O_RDONLY);
    close(fd);
  }
}

void cpu_bound() {
  int i;
  for (i=0; i<1000*1000; i++) {
    sin(i);
  }
}

void print_times() {
  struct tms buffer;
  int result = times(&buffer);
  check_error(result, "Fallita times");
  printf("System time:            %lu\n", buffer.tms_stime);
  printf("User time:              %lu\n", buffer.tms_utime);
  printf("Cumulative system time: %lu\n", buffer.tms_cstime);
  printf("Cumulative user time:   %lu\n", buffer.tms_cutime);
}

int main() {
  pid_t io_bound_child, cpu_bound_child;

  io_bound_child = fork();
  check_error(io_bound_child, "Prima fork fallita");
  if (0 == io_bound_child) {
    io_bound();
    return 0;  // primo figlio termina
  } 

  cpu_bound_child = fork();
  check_error(cpu_bound_child, "Seconda fork fallita");
  if (0 == cpu_bound_child) {
    cpu_bound();
    return 0; // secondo figlio termina
  }

  int status;
  wait(&status);
  wait(&status);
  print_times();
  return 0;
}
