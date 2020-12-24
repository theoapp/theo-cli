export const renderSSHOptions = function(ssh_options) {
  const ret = [];
  if (ssh_options.from?.length > 0) {
    ret.push(`from="${ssh_options.from.join(',')}"`);
  }
  if (ssh_options.permitopen?.length > 0) {
    ret.push(`permitopen="${ssh_options.permitopen.join(',')}"`);
  }
  if (ssh_options.environment?.length > 0) {
    ret.push(`environment="${ssh_options.environment.join(',')}"`);
  }
  if (ssh_options.command) {
    ret.push(`command="${ssh_options.command}"`);
  }
  if (ssh_options['restrict']) {
    ret.push('restrict');
    if (ssh_options['agent-forwarding']) {
      ret.push('agent-forwarding');
    }
    if (ssh_options['port-forwarding']) {
      ret.push('port-forwarding');
    }
    if (ssh_options['pty']) {
      ret.push('pty');
    }
    if (ssh_options['user-rc']) {
      ret.push('user-rc');
    }
    if (ssh_options['X11-forwarding']) {
      ret.push('X11-forwarding');
    }
  } else {
    if (ssh_options['no-agent-forwarding']) {
      ret.push('no-agent-forwarding');
    }
    if (ssh_options['no-port-forwarding']) {
      ret.push('no-port-forwarding');
    }
    if (ssh_options['no-pty']) {
      ret.push('no-pty');
    }
    if (ssh_options['no-user-rc']) {
      ret.push('no-user-rc');
    }
    if (ssh_options['no-X11-forwarding']) {
      ret.push('no-X11-forwarding');
    }
  }
  return ret.join(',');
};
