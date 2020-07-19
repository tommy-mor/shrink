from pynput.keyboard import Key, Controller
import errno
import os
import pty
from subprocess import Popen, STDOUT


# from
# https://stackoverflow.com/questions/12419198/python-subprocess-readlines-hangs/12471855#12471855

k = Controller()
#k.press('a')
#k.release('a')

master_fd, slave_fd = pty.openpty()  # provide tty to enable
                                     # line-buffering on ruby's side
proc = Popen(['sudo cat /dev/input/event9 | xxd -c 24'],
             shell=True,
             stdin=slave_fd, stdout=slave_fd, stderr=STDOUT, close_fds=True)
os.close(slave_fd)
try:
    while 1:
        try:
            data = os.read(master_fd, 512)
        except OSError as e:
            if e.errno != errno.EIO:
                raise
            break # EIO means EOF on some systems
        else:
            if not data: # EOF
                break

            left = repr(data).find('..r..')
            right = repr(data).find('..s..')
            if right != -1:
                k.press(Key.home)
                k.release(Key.home)
            elif left != -1:
                k.press(Key.insert)
                k.release(Key.insert)
            else:
                pass
                #print('neither')
finally:
    os.close(master_fd)
    if proc.poll() is None:
        proc.kill()
    proc.wait()
print("This is reached!")
